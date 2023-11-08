// ^ Главн.Стр./DashboardPage(стр.`панель приборов`)
import { GetServerSidePropsContext, NextPage } from 'next';
import React from 'react';
// import axios from 'axios';
// import nookies from 'nookies';

import * as Api from '@/api';
import { FileItem } from '@/api/dto/files.dto';
import { Layout } from '@/layouts/Layout';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { checkAuth } from '@/utils/checkAuth';
// import { Files } from '@/modules/Files';
import { FileList } from '@/components/FileList';
// import { Header } from '@/components/Header';

// import { UploadButton } from '@/components/UploadButton';
import { useRouter } from 'next/router';
// import { Menu } from 'antd';
// import {
//   DeleteOutlined,
//   FileImageOutlined,
//   FileOutlined,
// } from '@ant-design/icons';

// import styles from '@/styles/Home.module.scss';

// приним.масс.ф.с БД
interface Props {
  items: FileItem[];
}

// приним.масс.ф.с БД
// const DashboardPage: NextPage<Props> = ({ items }) => {
// !! Свойство "getLayout" не существует в типе "FunctionComponent<{}> & ...
// ~~ вар.решения убрать тип для const и постав.тип для парам.
const DashboardPage = ({ items }: any) => {
  const router = useRouter();
  const selectedMenu = router.pathname;

  return (
    // откл. > DashboardLayout
    // <main>
    //   {/* <Header /> // откл. > getLayout */}
    //   <div>Панель инструментов</div>
    // </main>
    <DashboardLayout>
      {/* <Files items={items} withActions /> */}
      <FileList items={items} />
    </DashboardLayout>
  );
};

// отрисов.ч/з getLayout(`Получите макет`) для стр.
DashboardPage.getLayout = (page: React.ReactNode) => {
  // fn возврата jsx разметки
  return <Layout title="Dashboard / Главная">{page}</Layout>;
};

// `Получить реквизиты на стороне сервера` проверка на SRV что user Авториз.
export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  // вызов fn()Авториз.
  const authProps = await checkAuth(ctx);

  // есть ли `перенаправить` в объ.res в мтд.checkAuth
  if ('redirect' in authProps) {
    // отправ.на Авториз.
    return authProps;
  }

  // упразд. > DashboardLayout.FileList
  // е/и redirect нет возвращ.пуст.props(остаёмся на "/dashboard")
  // return {
  //   props: {},
  // };

  // req список файлов с БД
  try {
    const items = await Api.files.getAll();
    console.log('items ', items);
    return {
      props: {
        items,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      props: { items: [] },
    };
  }
};

export default DashboardPage;
