import { useCallback, useContext, useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'

import type { IChatMessage, IMessage, ISystemMessage } from './ui'
import { Messages, RegisterName, SendMessage } from './ui'

import { useLocalStorage } from '../../hooks'

import style from './index.module.css'
import { AsideContext } from '../../providers'

const Chat = () => {
	const { active, setActive } = useContext(AsideContext)

	const [userName, setUserName] = useLocalStorage<string>(
		'userName',
		'',
	)

	const [socket, setSocket] = useState<Socket | null>(null)
	const [messages, setMessages] = useLocalStorage<IChatMessage[]>(
		'messagesData',
		[],
	)

	useEffect(() => {
		const newSocket = io('ws://89.169.168.253:4500', {
			transports: ['websocket', 'polling'],
		})

		newSocket.on('connect', () => {
			console.log('Соединение установлено')
			setSocket(newSocket)
			if (userName)
				newSocket.emit('set_username', { username: userName })
		})

		newSocket.on('message', (msg: IMessage) => {
			const newMsg: IChatMessage = {
				...msg,
				type: 'message',
			}
			setMessages(prev => [...prev, newMsg])
		})

		newSocket.on('system', (msg: ISystemMessage) => {
			const newMsg: IChatMessage = {
				...msg,
				type: 'system',
			}
			setMessages(prev => [...prev, newMsg])
		})

		newSocket.on('disconnect', () => {
			console.log('Соединение разорвано')
			setSocket(null)
		})

		return () => {
			newSocket.disconnect()
		}
	}, [])

	const submitMessage = useCallback(
		(message: string) => {
			if (!socket || !socket.connected) return
			socket.emit('message', { text: message })
		},
		[socket],
	)

	const submitUserName = useCallback(
		(name: string) => {
			if (!socket || !socket.connected) return
			setUserName(name)
			socket.emit('set_username', { username: name })
		},
		[socket, setUserName],
	)

	return (
		<>
			<div
				id={style.SidebarBack}
				className={active ? style.activeBack : ''}
			/>
			<aside
				className={`w-[320px] ${style.root} ${
					active ? style.activeAside : ''
				}`}>
				<div
					id={style.SidebarContent}
					className='relative flex flex-col justify-between py-4 px-8 bg-linear-to-b from-[#343a40] to-[#2e3361]'>
					<button
						onClick={() => setActive(prev => !prev)}
						style={{
							rotate: active ? '180deg' : '0deg',
						}}
						id={style.CloseButton}
						className='absolute text-2xl font-bold top-[50px] left-0 -translate-x-1/2 rounded-full bg-btn hover:bg-btn-hover p-2 w-[48px] h-[48px] cursor-pointer'>
						{'<'}
					</button>
					<div className='flex flex-col overflow-auto'>
						<p className='text-md font-bold text-center uppercase'>
							Общий чат криптанов
						</p>
						<hr className='my-4' />
						<Messages messages={messages} />
					</div>
					{userName ? (
						<SendMessage submitMessage={submitMessage} />
					) : (
						<RegisterName submitUserName={submitUserName} />
					)}
				</div>
			</aside>
		</>
	)
}
export default Chat
