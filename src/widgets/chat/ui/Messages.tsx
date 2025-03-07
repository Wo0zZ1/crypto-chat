import Message, { IChatMessage } from './Message'
import { useEffect, useRef } from 'react'

interface IMessagesProps {
	messages: IChatMessage[]
}

const Messages = ({ messages }: IMessagesProps) => {
	const scrollRef = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		if (!scrollRef.current) return
		const scrollHeight = scrollRef.current.scrollHeight
		scrollRef.current.scrollTo({
			top: scrollHeight,
			behavior: 'smooth',
		})
	})

	return (
		<div
			ref={scrollRef}
			className='my-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 scrollbar-thumb-rounded scrollbar-track-rounded hover:scrollbar-thumb-gray-500'>
			{messages.map((message, index) => (
				<Message message={message} key={index} />
			))}
		</div>
	)
}
export default Messages
