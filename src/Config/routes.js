import Login from '../Pages/Login';
import Dashboard from '../Pages/Dashboard';
import NotFound from '../Pages/NotFound';
import Register from '../Pages/Register';
import ForgetPassword from '../Pages/ForgetPassword';

const routes = [
	{
		path: '/login',
		component: Login,
		isPrivate: false,
	},
	{
		path: '/register',
		component: Register,
		isPrivate: false,
	},
	// {
	// 	path: '/forget-password',
	// 	component: ForgetPassword,
	// 	isPrivate: false,
	// },
	{
		path: '/dashboard',
		component: Dashboard,
		isPrivate: true,
	},
	{
		path: '/*',
		component: NotFound,
		isPrivate: true,
	},
];

export default routes;
