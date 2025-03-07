import { FormEvent, useState } from 'react'

import sendIcon from '../assets/icons8-send-48.png'

interface ISendMessageProps {
	submitHandler: (msg: string) => void
}

const SendMessage = ({ submitHandler }: ISendMessageProps) => {
	const [messageText, setMessageText] = useState<string>('')

	const formHandler = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (!messageText.trim().length) return
		setMessageText('')
		submitHandler(messageText) // Callback
	}

	return (
		<form onSubmit={formHandler} className='relative'>
			<input
				className='bg-transparent w-full px-2 py-1 shadow-md shadow-slate-800/60 border-1 border-[#202444] focus:border-[#141524] rounded-md outline-0'
				type='text'
				placeholder='Введите сообщение: '
				onChange={e => setMessageText(e.target.value)}
				value={messageText}
			/>
			<button className='absolute fill-bg p-0.5 cursor-pointer saturate-25 hover:saturate-100 right-1 w-[32px]'>
				<img src={sendIcon} alt='send' />
			</button>
		</form>
	)
}
export default SendMessage
