import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Div, ErrorP, P } from './Forgot.styles';
import { useTranslation } from 'react-i18next';
import { useForgotPasswordMutation } from 'service/httpService';
import { t } from 'i18next';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { saveUserId } from 'redux/reducers/userSlice';
import { RootState } from 'redux/store';
import { Button } from 'components/signIn/Signin.styles';
import { Label } from 'components/Layout/Layout.styles';
import { DivForm, Form, H1 } from 'components/restorePassword/restorePassword.style';
import { Input } from 'components/clientSettings/clentSettings.styles';
import { openNotificationWithIcon } from 'constants/links';

export type FormEmail = {
	email: string;
};

const schema = Yup.object({
	email: Yup.string()
		.required(`${t('ForgotPassword.emailReq')}`)
		.email(),
}).required();

const forgotPassword = () => {
	const [forgot] = useForgotPasswordMutation();
	const dispatch = useAppDispatch();

	const { user } = useAppSelector<RootState>((state) => state);

	const {
		handleSubmit,
		control,
		reset,
		formState: { errors },
	} = useForm<FormEmail>({
		resolver: yupResolver(schema),
	});

	const { t } = useTranslation();

	const onSubmit: SubmitHandler<FormEmail> = async (values) => {
		try {
			await forgot(values).unwrap();
			dispatch(saveUserId(user.id as number));
			reset();
			openNotificationWithIcon('success', `${t('ForgotPassword.success')}`);
		} catch (e) {
			reset();
			openNotificationWithIcon('error');
		}
	};

	return (
		<Div>
			<H1>{`${t('ForgotPassword.title')}`}</H1>
			<P>{`${t('ForgotPassword.instruction')}`}</P>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<DivForm>
					<Label>{`${t('ForgotPassword.email')}`}</Label>
					<Controller
						render={({ field }) => <Input type="email" {...field} />}
						name="email"
						control={control}
					/>
					{<ErrorP>{errors.email?.message}</ErrorP>}
					<Button type="submit">{`${t('ForgotPassword.sendButton')}`}</Button>
				</DivForm>
			</Form>
		</Div>
	);
};

export default forgotPassword;
