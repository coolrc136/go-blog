import { PageContainer } from '@ant-design/pro-layout';
import React from 'react';
import styles from './index.less';
import PageForm from '../Links/components/form'

export default () => {
  return (
    <PageContainer content="在此处编辑关于页面" className={styles.main}>
      <PageForm name="ABOUT" id={2} />
      <div
        style={{
          paddingTop: 50,
          textAlign: 'center',
        }}
      >
      </div>
    </PageContainer>
  );
};
