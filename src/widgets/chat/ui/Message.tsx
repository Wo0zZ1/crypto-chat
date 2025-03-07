export interface IMessageProps {
	message: IChatMessage
}

export interface IMessage {
	type: 'message'
	text: string
	userName: string
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
				<i>{message.timestamp} </i>
				<i>
					{message.type === 'system'
						? `Системное сообщение:`
						: `От ${message.userName}:`}
				</i>
			</p>
			<p className='font-medium'>{message.text}</p>
		</div>
	)
}

export default Message
