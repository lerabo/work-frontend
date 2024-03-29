import { Link, useNavigate } from 'react-router-dom';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Div, Div2, H1, H2, Button, LinkStyle, P, ErrorP } from './Signin.styles';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'redux/hooks';
import { saveEmail, saveRole, saveToken, saveUserId } from 'redux/reducers/userSlice';
import { useSignInMutation } from 'service/httpService';
import { CreateJobPost, PostJobPage, Welcome } from 'constants/routes';
import { openNotificationWithIcon, Role } from 'constants/links';
import { DivForm, Form } from 'components/restorePassword/restorePassword.style';
import { Input } from 'components/clientSettings/clentSettings.styles';
import { Label } from 'components/Layout/Layout.styles';

export type FormData = {
	email: string;
	password: string;
	role: string;
};

const schema = Yup.object({
	email: Yup.string().required(),
	password: Yup.string().min(8).required(),
}).required();

const signIn = () => {
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const [signIn] = useSignInMutation();
	const navigate = useNavigate();
	const {
		handleSubmit,
		control,
		reset,
		formState: { errors },
	} = useForm<FormData>({
		resolver: yupResolver(schema),
	});

	const onSubmit: SubmitHandler<FormData> = async (values) => {
		const { email, password, role } = values;

		try {
			const res = await signIn({ email, password, role }).unwrap();
			dispatch(saveToken(res.access_token));
			dispatch(saveUserId(res.userId));
			dispatch(saveRole(res.role));
			dispatch(saveEmail(values.email));
			openNotificationWithIcon('success', `${t('SignIn.success')}`);
			reset({ email: '', password: '' });
			if (res.role === Role.Client) {
				navigate(`${CreateJobPost}`);
			} else if (res.role === Role.Freelancer) {
				navigate(`${PostJobPage}`);
			} else navigate(`${Welcome}`);
		} catch (e) {
			reset({ email: '', password: '' });
			openNotificationWithIcon('error', `${t('SignIn.error')}`);
		}
	};

	return (
		<Div>
			<div>
				<H1>{`${t('SignIn.title')}`}</H1>
			</div>
			<div>
				<H2>{`${t('SignIn.upperText')}`}</H2>
			</div>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<DivForm>
					<Label>{`${t('SignIn.email')}`}</Label>
					<Controller
						render={({ field }) => <Input type="email" {...field} />}
						name="email"
						control={control}
					/>
					<ErrorP>{errors.email?.message}</ErrorP>
					<Label>{`${t('SignIn.password')}`}</Label>
					<Controller
						render={({ field }) => <Input type="password" {...field} />}
						name="password"
						control={control}
					/>
					<ErrorP>{errors.password?.message}</ErrorP>
					<LinkStyle>
						<Link to="/forgot-password">{`${t('SignIn.forgotPassword')}`}</Link>
					</LinkStyle>
					<Button type="submit">{`${t('SignIn.buttonSignin')}`}</Button>
				</DivForm>
			</Form>
			<Div2>
				<P>{`${t('SignIn.text')}`}</P>
				<Link to="/sign-up">{`${t('SignIn.registerLink')}`}</Link>
			</Div2>
		</Div>
	);
};

export default signIn;
