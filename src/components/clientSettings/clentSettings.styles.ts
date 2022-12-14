import {
	GREY,
	LIGHTBLUE_COLOR,
	LIGHTGREY_COLOR,
	PURPLE,
	RED_COLOR,
	VIOLET,
	WHITE_COLOR,
} from 'constants/colors';
import { LARGE_FONT_SIZE, MEDIUM_FONT_SIZE } from 'constants/fonts';
import styled from 'styled-components';

export const Container = styled.div`
	padding: 1% 8% 1% 8%;
	font-size: ${MEDIUM_FONT_SIZE};
`;

export const MainTitle = styled.h1`
	font-weight: 500;
`;

export const Title = styled.div`
	font-size: ${LARGE_FONT_SIZE};
	margin-top: 20px;
`;

export const SaveButton = styled.button`
	width: 150px;
	height: 50px;
	border-radius: 10px;
	background-color: ${VIOLET};
	color: ${WHITE_COLOR};
	text-align: center;
	margin: 2%;
	font-size: ${MEDIUM_FONT_SIZE};
	box-shadow: 3px 2px 2px ${GREY};
	&:hover {
		background-color: ${PURPLE};
		color: ${VIOLET};
	}
	&active {
		box-shadow: 0 5px;
		transform: translateY(10px);
	}
`;

export const CancelButton = styled.button`
	width: 140px;
	height: 50px;
	border-radius: 10px;
	border: 1px solid ${VIOLET};
	background-color: ${WHITE_COLOR};
	color: ${VIOLET};
	margin: 2%;
	text-align: center;
	font-size: ${MEDIUM_FONT_SIZE};
	box-shadow: 3px 2px 2px ${GREY};
	&:hover {
		background-color: ${LIGHTBLUE_COLOR};
	}
	&active {
		box-shadow: 0 5px;
		transform: translateY(10px);
	}
`;

export const Column = styled.div`
	float: left;
	width: 50%;
	padding: 10px;
	@media screen and (max-width: 600px) {
		width: 100%;
	}
`;
export const MinColumn = styled.div`
	float: left;
	width: 20%;
	padding: 10px;
	@media screen and (max-width: 600px) {
		width: 100%;
	}
`;
export const MaxColumn = styled.div`
	float: left;
	width: 80%;
	padding: 10px;
	@media screen and (max-width: 600px) {
		width: 100%;
	}
`;

export const P = styled.p`
	color: ${RED_COLOR};
	padding: 0;
`;

export const Div = styled.div`
	padding: 10px;
`;

export const Input = styled.input`
	width: 100%;
	height: 40px;
	padding: 0.375rem 0.75rem;
	box-sizing: border-box;
	border: 1px solid ${LIGHTGREY_COLOR};
	border-radius: 5px;
	-webkit-transition: 0.5s;
	transition: 0.5s;
	outline: none;
	font-size: ${MEDIUM_FONT_SIZE};
`;

export const TextArea = styled.textarea`
	width: 100%;
	border: 1px solid ${LIGHTGREY_COLOR};
`;
export const Button = styled.div`
	border: 1px solid ${VIOLET};
	border-radius: 10px;
	padding: 10px 20px;
	width: 150px;
	margin-bottom: 5%;
	background-color: ${WHITE_COLOR};
	color: ${VIOLET};
	margin-right: 10%;
	text-align: center;
	font-size: ${MEDIUM_FONT_SIZE};
	box-shadow: 3px 2px 2px ${GREY};
	cursor: pointer;
	&.defaultActive {
		background-color: ${VIOLET};
		color: ${WHITE_COLOR};
	}
	&:hover {
		background-color: ${PURPLE};
		color: ${VIOLET};
	}
`;
export const ButtonBlock = styled.div`
	display: block;
	justify-content: flex-start;
	margin: 0 auto;
`;
export const Img = styled.img`
	width: 60%;
	height: 60%;
	margin: auto;
`;
export const ProfilePhoto = styled.div`
	display: flex;
	flex-direction: column;
	align-self: center;
	min-height: 300px;

	& > button {
		width: 130px;
		border: 1px solid;
		margin-top: 10px;
		background-color: #f0f0f0;
	}
`;

export const RadioLabel = styled.label`
	width: 200px;
`;
