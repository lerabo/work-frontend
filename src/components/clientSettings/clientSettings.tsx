import { useTranslation } from 'react-i18next';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Select from 'react-select';
import {
	checkList,
	Data,
	DataSchema,
	ICountry,
	initialCountry,
	password,
	selection,
	settings,
	ValidationSchema,
} from 'components/clientSettings/data';
import {
	Column,
	Container,
	SaveButton,
	CancelButton,
	MainTitle,
	P,
	Title,
	Div,
	Input,
	TextArea,
	MinColumn,
	MaxColumn,
	ButtonBlock,
	Button,
	Img,
	ProfilePhoto,
} from 'components/clientSettings/clentSettings.styles';
import countryList from 'react-select-country-list';
import { FormEvent, useEffect, useMemo, useState } from 'react';
import editIcon from 'assets/icon-pencil.png';
import ChangePassword from 'components/ChangePassword/ChangePassword';
import RadioButtons from 'components/freelancerJobs/components/radio';
import { RootState } from 'redux/store';
import { useAppSelector } from 'redux/hooks';
import { useSendData } from 'components/clientSettings/dataSend';
import { useGetClientInfoByUserQuery } from 'service/httpService';
import { ImgSpinner } from 'components/freelancerJobs/freelancerPage.styles';
import Spinner from 'assets/spinner.gif';
import { defaultProfilePhoto } from 'constants/links';
import { Image } from 'antd';
import { CenterDiv } from 'components/inviteTalent/inviteTalent.styles';

const ClientSettings = () => {
	const { user } = useAppSelector<RootState>((state) => state);
	const userId = user.id;
	const { data: clientInfo, isLoading } = useGetClientInfoByUserQuery(userId);
	const { sendData, sendUpdatedData } = useSendData();
	const { t } = useTranslation();
	const {
		register,
		handleSubmit,
		control,
		setValue,
		getValues,
		formState: { errors },
	} = useForm<DataSchema>({
		resolver: yupResolver(ValidationSchema),
	});
	const [active, setActive] = useState<{ [name: string]: string }>({ [settings]: settings });
	const [website, setWebsiteValue] = useState<string | undefined>(undefined);
	const [industry, setIndustryValue] = useState<ICountry>(initialCountry);
	const [quantity, setQuantityValue] = useState<string | null>(null);
	const [file, setFile] = useState<string>(defaultProfilePhoto);
	const options = useMemo(() => countryList().getData(), []);

	const onChangePhotoHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const reader = new FileReader();
		reader.onloadend = () => {
			if (typeof reader.result === 'string') {
				setFile(reader.result);
			}
		};
		const newFile = e.target.files && e.target.files[0];
		if (newFile) {
			reader.readAsDataURL(newFile);
		}
	};
	const onPhotoDelete = () => {
		event?.preventDefault();
		setFile(defaultProfilePhoto);
	};

	const websiteChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		setWebsiteValue(event.target.value);
	};

	const quantityHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setQuantityValue(event.target.value);
	};

	const handleChangeActive = (e: FormEvent<HTMLDivElement>) => {
		const target = e.target as HTMLDivElement;
		setActive({ [target.id]: target.id });
	};
	const cancelHandler = () => {
		setValue('name', clientInfo.name);
		setValue('country', { label: clientInfo.country, value: clientInfo.country });
		setValue('description', clientInfo.description);
		setWebsiteValue(clientInfo.website);
		setIndustryValue({ value: clientInfo.industry, label: clientInfo.industry });
		setQuantityValue(clientInfo.quantity);
	};

	useEffect(() => {
		if (clientInfo) {
			setValue('name', clientInfo.name);
			setValue('country', { label: clientInfo.country, value: clientInfo.country });
			setValue('description', clientInfo.description);
			setWebsiteValue(clientInfo.website);
			setIndustryValue({ value: clientInfo.industry, label: clientInfo.industry });
			setQuantityValue(clientInfo.quantity);
			setFile(clientInfo.photo);
		}
	}, [clientInfo]);

	const onSubmit = (data: Data) => {
		const NewData = {
			...data,
			website,
			industry,
			quantity,
			userId,
			photo: file,
		};
		if (clientInfo) {
			sendUpdatedData(NewData, clientInfo.id);
		} else {
			sendData(NewData);
		}
	};

	return (
		<Container>
			<MinColumn>
				<ButtonBlock>
					<Button className={active?.settings ? 'defaultActive' : ''} onClick={handleChangeActive}>
						<span id={settings}>{`${t('ClientSettings.settings')}`}</span>
					</Button>
					<Button className={active?.password ? 'defaultActive' : ''} onClick={handleChangeActive}>
						<span id={password}>{`${t('ClientSettings.password')}`}</span>
					</Button>
				</ButtonBlock>
			</MinColumn>
			<MaxColumn>
				{isLoading && <ImgSpinner src={Spinner} />}
				{active?.settings === settings && (
					<form onSubmit={handleSubmit(onSubmit)}>
						<MainTitle>
							{`${t('ClientSettings.title')}`}
							{clientInfo && (
								<button type="button">
									<Img src={editIcon}></Img>
								</button>
							)}
						</MainTitle>
						<div>
							<Column>
								<Title>{`${t('ClientSettings.name')}`}</Title>
								<Input
									type="text"
									{...register('name')}
									className={`${errors.name ? 'is-invalid' : ''}`}
								/>
								{errors.name && <P>{errors.name?.message}</P>}
								<Title>{`${t('ClientSettings.email')}`}</Title>
								<Input type="text" value={user.email} />
								<Title>{`${t('ClientSettings.country')}`}</Title>
								<Controller
									name="country"
									control={control}
									render={({ field }) => {
										return (
											<Select
												{...field}
												options={options}
												className={`${errors.country ? 'is-invalid' : ''}`}
												value={getValues('country')}
											/>
										);
									}}
								/>
								{errors.country && <P>{errors.country.value?.message}</P>}
							</Column>
							<Column>
								<ProfilePhoto>
									<Title>{`${t('ProfileEdit.profilePhotoTitle')}`}</Title>
									<Image width={200} src={file || defaultProfilePhoto} />
									<input type={'file'} accept=".png, .jpg, .jpeg" onChange={onChangePhotoHandler} />
									<button type="button" onClick={onPhotoDelete}>
										{`${t('ProfileEdit.deletePhotoButton')}`}
									</button>
								</ProfilePhoto>
							</Column>
						</div>
						<Div>
							<Title>{`${t('ClientSettings.website')}`}</Title>
							<Input type="text" onChange={websiteChangeHandler} value={website} />
						</Div>
						<Column>
							<Title>{`${t('ClientSettings.industry')}`}</Title>
							<Select
								options={selection}
								onChange={(choice) => setIndustryValue(choice as ICountry)}
								value={industry}
							/>
						</Column>
						<Column>
							<div>
								<Title>{`${t('ClientSettings.quantity')}`}</Title>
								<RadioButtons
									handleChange={quantityHandleChange}
									radio={quantity}
									value={checkList}
								/>
							</div>
						</Column>
						<Div>
							<Title>{`${t('ClientSettings.description')}`}</Title>
							<TextArea
								{...register('description')}
								className={`${errors.description ? 'is-invalid' : ''}`}
							/>
							{errors.description && <P>{errors.description?.message}</P>}
						</Div>
						<CenterDiv>
							<SaveButton type="submit">{`${t('ClientSettings.save')}`}</SaveButton>
							{clientInfo && (
								<CancelButton type="button" onClick={cancelHandler}>{`${t(
									'ClientSettings.cancel',
								)}`}</CancelButton>
							)}
						</CenterDiv>
					</form>
				)}
				{active?.password === password && <ChangePassword />}
			</MaxColumn>
		</Container>
	);
};

export default ClientSettings;
