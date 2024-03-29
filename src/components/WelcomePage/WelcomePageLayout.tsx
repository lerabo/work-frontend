import React, { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { WelcomePageLayoutWrapper, TitleStyled, ImageStyled } from './WelcomePageLayout.styles';
import ArrowDowm from 'assets/arrowDown.jpg';
import { RootState } from 'redux/store';
import { useAppSelector } from 'redux/hooks';
import { useNavigate } from 'react-router-dom';
import { RoleSelection, Settings, SettingsJobOwner } from 'constants/routes';
import { Role } from 'constants/links';

const WelcomePageLayout: FC = () => {
	const { user } = useAppSelector<RootState>((state) => state);
	const { t } = useTranslation();
	const navigate = useNavigate();

	useEffect(() => {
		if (!user.role) {
			navigate(`${RoleSelection}`);
		}
	}, []);

	return (
		<WelcomePageLayoutWrapper>
			<TitleStyled>{`${t('WelcomePage.title')}`}</TitleStyled>
			<p>{`${t('WelcomePage.description')}`}</p>
			<p>{`${t('WelcomePage.pointerToLink')}`}</p>
			<ImageStyled src={ArrowDowm} alt="arrowDown" />
			{user.role === Role.Freelancer ? (
				<Link to={Settings}>{`${t('WelcomePage.linkDescription')}`}</Link>
			) : (
				<Link to={SettingsJobOwner}>{`${t('WelcomePage.linkDescription')}`}</Link>
			)}
		</WelcomePageLayoutWrapper>
	);
};

export default WelcomePageLayout;
