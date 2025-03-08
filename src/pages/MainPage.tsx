import MainLayout from '../layouts/MainLayout'

import Chat from '../widgets/chat'
import Main from '../widgets/main'

const MainPage = () => {
	return (
		<MainLayout>
			<div className='flex'>
				<Main />
				<Chat />
			</div>
		</MainLayout>
	)
}
export default MainPage
