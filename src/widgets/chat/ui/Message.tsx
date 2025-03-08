export interface IMessageProps {
	message: IChatMessage
}

export interface IMessage {
	type: 'message'
	text: string
	username: string
	timestamp: string
}

export interface ISystemMessage {
	type: 'system'
	text: string
	timestamp: string
}

export type IChatMessage = IMessage | ISystemMessage

const Message = ({ message }: IMessageProps) => {
	return (
		<div className='text-sm mb-5'>
			<p className='text-white/70'>
				<i>
					{new Date(message.timestamp).toLocaleTimeString('ru-RU')}
				</i>
				&nbsp;
				<i>
					{message.type === 'system'
						? `Системное сообщение:`
						: `От ${message.username}:`}
				</i>
			</p>
			<p className='font-medium'>{message.text}</p>
		</div>
	)
}

export default Message
