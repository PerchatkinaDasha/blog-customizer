import { createRoot } from 'react-dom/client';
import { StrictMode, useState, useMemo, CSSProperties } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	// Состояние параметров статьи
	const [articleOptions, setArticleOptions] =
		useState<ArticleStateType>(defaultArticleState);

	// Оптимизированный объект стилей
	const articleStyles = useMemo(() => {
		return {
			'--font-family': articleOptions.fontFamilyOption.value,
			'--font-size': articleOptions.fontSizeOption.value,
			'--font-color': articleOptions.fontColor.value,
			'--container-width': articleOptions.contentWidth.value,
			'--bg-color': articleOptions.backgroundColor.value,
		} as CSSProperties;
	}, [articleOptions]);

	return (
		<main className={clsx(styles.main)} style={articleStyles}>
			{/* Форма параметров статьи */}
			<ArticleParamsForm
				defaultOptions={articleOptions}
				applyOptions={setArticleOptions}
			/>
			{/* Компонент статьи */}
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
