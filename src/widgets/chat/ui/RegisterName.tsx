import { FormEvent, useState } from 'react'

interface IRegisterName {
	submitUserName: (name: string) => void
}

const RegisterName = ({ submitUserName }: IRegisterName) => {
	const [nameValue, setNameValue] = useState<string>('')

	const submitHandler = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (!nameValue.length) return
		submitUserName(nameValue)
		setNameValue('')
	}

	return (
		<form onSubmit={submitHandler} className='flex flex-col gap-1.5'>
			<input
				className='bg-transparent w-full px-2 py-1 shadow-md shadow-slate-800/60 border-1 border-[#202444] focus:border-[#141524] rounded-md outline-0'
				type='text'
				placeholder='Введите имя: '
				onChange={e => setNameValue(e.target.value)}
				value={nameValue}
			/>
			<button className='bg-linear-to-br from-bg/50 to-[#161830]/50 font-bold hover:from-bg/80 hover:to-[#161830] transition-colors p-1.5 shadow-slate-800/60 focus:border-[#141524] rounded-md cursor-pointer'>
				Подтвердить
			</button>
		</form>
	)
}
export default RegisterName
