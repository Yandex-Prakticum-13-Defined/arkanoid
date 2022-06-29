import React, { FC, useEffect, useRef } from 'react';
import './Start.scss';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { ERoutes } from '../../utils/constants/routes';
import { clearFirstLoading } from '../../store/reducer/helper';
import { toggleTheme } from '../../API/themeAPI';
import { getCurrentUserTheme } from '../../utils/getCurrentUserTheme';

interface ILink {
  route: ERoutes;
  isAuthRoute?: boolean;
  text: string;
}

const Start: FC = () => {
  const isAuthenticated = useAppSelector((state) => state.user.data !== null);
  const userId = useAppSelector((state) => state.user.data?.id);
  const userIdOrGuest = userId ? String(userId) : 'guest';
  const dispatch = useAppDispatch();
  const firstLoading = useAppSelector((state) => state.helper.firstLoading);
  const refToggler = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(clearFirstLoading());
    }
  }, []);

  useEffect(() => {
    try {
      if (localStorage.getItem('theme') === null) {
        return;
      }

      const currentUserTheme = getCurrentUserTheme(JSON.parse(localStorage.getItem('theme')!), userIdOrGuest);
      const rootElement = document.querySelector('#root')!;

      if (currentUserTheme === 'dark') {
        turnDarkThemeOn(rootElement);
        refToggler.current && (refToggler.current.checked = true);
      } else {
        turnLightThemeOn(rootElement);
      }
    } catch (error) {
      console.log(error);
    }
  });

  const links: ILink[] = [
    { route: ERoutes.GAME, text: 'Начать игру' },
    { route: ERoutes.PROFILE, text: 'Профиль' },
    { route: ERoutes.LEADERBOARD, text: 'Таблица лидеров' },
    { route: ERoutes.FORUM, text: 'Форум' },
    { route: ERoutes.LOGOUT, text: 'Выйти' },
    { route: ERoutes.LOGIN, text: 'Войти', isAuthRoute: true },
    { route: ERoutes.REGISTER, text: 'Зарегистрироваться', isAuthRoute: true }
  ];

  const h1Variants = {
    hidden: { opacity: 0, x: -1000 },
    visible: { opacity: 1, x: 0 }
  };

  const pVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const linkVariants = {
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.4 }
    }),
    hidden: { opacity: 0, y: 100 }
  };

  const renderLink = (link: ILink, i: number) => (
    <motion.div
      key={link.text}
      variants={linkVariants}
      initial={firstLoading ? 'hidden' : 'visible'}
      animate='visible'
      custom={i}
    >
      <Link className='start__link' to={link.route}>
        {link.text}
      </Link>
    </motion.div>
  );

  async function onChangeTheme() {
    try {
      const rootElement = document.querySelector('#root')!;
      const newTheme = await toggleTheme(userIdOrGuest);

      if (localStorage.getItem('theme') === null) {
        localStorage.setItem('theme', JSON.stringify({ [userIdOrGuest]: newTheme }));
      } else {
        const currentThemeObj = JSON.parse(localStorage.getItem('theme')!);
        localStorage.setItem('theme', JSON.stringify({ ...currentThemeObj, [userIdOrGuest]: newTheme }));
      }

      if (newTheme === 'dark') {
        turnDarkThemeOn(rootElement);
      } else {
        turnLightThemeOn(rootElement);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section className='start'>
      <div className='start__links'>
        {
          links.filter((route) => isAuthenticated === !route.isAuthRoute).map((link, i) => (renderLink(link, i)))
        }
      </div>
      <div className='start__text-container'>
        <motion.h1
          variants={h1Variants}
          initial={firstLoading ? 'hidden' : 'visible'}
          animate='visible'
          className='start__title'
        >
          Арканоид
        </motion.h1>
        <motion.p
          variants={pVariants}
          initial={firstLoading ? 'hidden' : 'visible'}
          animate='visible'
          transition={{ duration: 2 }}
          className='start__text'
        >
          В нижней части экрана находится ракетка,
          которая перемещается горизонтально с помощью мыши или стрелок клавиатуры.
          В верхней части экрана расположены блоки,
          которые разрушаются при попадании в них мячика.
          Если трижды не удалось отбить мячик ракеткой, то игра заканчивается.
        </motion.p>
      </div>
      <input className='start__toggle-button' type='checkbox' onChange={onChangeTheme} ref={refToggler}/>
    </section>
  );
};

export default Start;

function turnDarkThemeOn(rootElement: Element) {
  rootElement.classList.remove('theme_light');
  rootElement.classList.add('theme_dark');
}

function turnLightThemeOn(rootElement: Element) {
  rootElement.classList.remove('theme_dark');
  rootElement.classList.add('theme_light');
}
