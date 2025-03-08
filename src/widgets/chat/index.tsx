import { useCallback, useContext, useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'

import type { IChatMessage, IMessage, ISystemMessage } from './ui'
import { Messages, RegisterName, SendMessage } from './ui'

import { useLocalStorage } from '../../hooks'

import style from './index.module.css'
import { AsideContext } from '../../providers'

const mockMessages: IChatMessage[] = [
	{
		type: 'system',
		text: 'Wo0zZ1 присоединился к чату!',
		timestamp: '04.03.2025',
	},
	{
		type: 'message',
		text: 'Привет, друзья!',
		timestamp: '04.03.2025',
		userName: 'Wo0zZ1',
	},
	{
		type: 'system',
		text: 'Влад присоединился к чату!',
		timestamp: '04.03.2025',
	},
	{
		type: 'message',
		text: 'Привет, Wo0zZ1!',
		timestamp: '04.03.2025',
		userName: 'Влад',
	},
	{
		type: 'message',
		text: 'Привет, Wo0zZ1!',
		timestamp: '04.03.2025',
		userName: 'Влад',
	},
	{
		type: 'message',
		text: 'Привет, Wo0zZ1!',
		timestamp: '04.03.2025',
		userName: 'Влад',
	},
	{
		type: 'message',
		text: 'Привет, Wo0zZ1!',
		timestamp: '04.03.2025',
		userName: 'Влад',
	},
	{
		type: 'system',
		text: 'Wo0zZ1 покинул чат!',
		timestamp: '05.03.2025',
	},
	{
		type: 'system',
		text: 'Влад покинул чат!',
		timestamp: '05.03.2025',
	},
]

const Chat = () => {
	const { active, setActive } = useContext(AsideContext)

	const [userName, setUserName] = useLocalStorage<string>(
		'userName',
		'',
	)

	const [socket, setSocket] = useState<Socket | null>(null)
	const [messages, setMessages] =
		useState<IChatMessage[]>(mockMessages)

	// useEffect(() => {
	// 	const newSocket = io('ws://89.169.168.253:4500')

	// 	newSocket.on('connect', () => {
	// 		console.log('Соединение установлено')
	// 		setSocket(newSocket)
	// 	})

	// 	newSocket.on('message', (msg: IMessage) => {
	// 		const newMsg: IChatMessage = {
	// 			...msg,
	// 			type: 'message',
	// 		}
	// 		setMessages(prev => [...prev, newMsg])
	// 	})

	// 	newSocket.on('system', (msg: ISystemMessage) => {
	// 		const newMsg: IChatMessage = {
	// 			...msg,
	// 			type: 'system',
	// 		}
	// 		setMessages(prev => [...prev, newMsg])
	// 	})

	// 	newSocket.on('disconnect', () => {
	// 		console.log('Соединение разорвано')
	// 		setSocket(null)
	// 	})

	// 	return () => {
	// 		newSocket.disconnect()
	// 	}
	// }, [])

	const submitHandler = useCallback(
		(msg: string) => {
			if (!socket || !socket.connected) return
			console.log(msg)
		},
		[socket],
	)

	return (
		<>
			<div
				onClick={() => setActive(false)}
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
						className='absolute top-[50px] left-0 -translate-x-1/2 rounded-full bg-btn hover:bg-btn-hover p-2 w-[48px] h-[48px] cursor-pointer'>
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
						<SendMessage submitHandler={submitHandler} />
					) : (
						<RegisterName
							userName={userName}
							setUserName={setUserName}
						/>
					)}
				</div>
			</aside>
		</>
	)
}
export default Chat
