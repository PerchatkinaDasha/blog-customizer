import { useRef, useState } from 'react';
import clsx from 'clsx';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import { Text } from 'src/ui/text';
import { Separator } from 'src/ui/separator';
import {
	OptionType,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

// Определение типов пропсов
type ArticleParamsFormProps = {
	defaultOptions: ArticleStateType;
	applyOptions: (newState: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	defaultOptions,
	applyOptions,
}: ArticleParamsFormProps) => {
	const containerRef = useRef<HTMLDivElement | null>(null); // Ссылка на контейнер
	const [menuVisible, setMenuVisible] = useState(false); // Состояние бокового меню
	const [currentOptions, setCurrentOptions] =
		useState<ArticleStateType>(defaultOptions); // Выбранные параметры

	// Закрытие меню при клике вне его области
	useOutsideClickClose({
		isOpen: menuVisible,
		rootRef: containerRef,
		onChange: setMenuVisible,
	});

	// Переключение видимости бокового меню
	const toggleMenu = () => setMenuVisible((prevState) => !prevState);

	// Применение выбранных параметров
	const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		applyOptions(currentOptions);
	};

	// Сброс параметров к значениям по умолчанию
	const handleFormReset = () => {
		setCurrentOptions(defaultArticleState);
		applyOptions(defaultArticleState);
	};

	// Обновление состояния выбранных параметров
	const updateOption = (
		optionKey: keyof ArticleStateType,
		newValue: OptionType
	) => {
		setCurrentOptions((prevOptions) => ({
			...prevOptions,
			[optionKey]: newValue,
		}));
	};

	return (
		<div ref={containerRef}>
			{/* Кнопка открытия/закрытия меню */}
			<ArrowButton onClick={toggleMenu} isOpen={menuVisible} />

			{/* Боковое меню */}
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: menuVisible,
				})}>
				<form
					className={styles.form}
					onSubmit={handleFormSubmit}
					onReset={handleFormReset}>
					<Text weight={800} size={31} uppercase align='left'>
						Задайте параметры
					</Text>

					{/* Выбор шрифта */}
					<Select
						options={fontFamilyOptions}
						selected={currentOptions.fontFamilyOption}
						title='Шрифт'
						onChange={(value) => updateOption('fontFamilyOption', value)}
					/>

					{/* Выбор размера шрифта */}
					<RadioGroup
						name='fontSizeSelection'
						options={fontSizeOptions}
						title='Размер шрифта'
						selected={currentOptions.fontSizeOption}
						onChange={(value) => updateOption('fontSizeOption', value)}
					/>

					{/* Выбор цвета шрифта */}
					<Select
						options={fontColors}
						selected={currentOptions.fontColor}
						title='Цвет шрифта'
						onChange={(value) => updateOption('fontColor', value)}
					/>

					<Separator />

					{/* Выбор цвета фона */}
					<Select
						options={backgroundColors}
						selected={currentOptions.backgroundColor}
						title='Цвет фона'
						onChange={(value) => updateOption('backgroundColor', value)}
					/>

					{/* Выбор ширины контента */}
					<Select
						options={contentWidthArr}
						selected={currentOptions.contentWidth}
						title='Ширина контента'
						onChange={(value) => updateOption('contentWidth', value)}
					/>

					{/* Кнопки управления */}
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
