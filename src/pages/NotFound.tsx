
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';

const NotFound: React.FC = () => {
  return (
    <Layout>
      <div className="text-center py-20">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <p className="text-xl text-gray-700 mb-8">페이지를 찾을 수 없습니다.</p>
        <Button asChild>
          <Link to="/">홈으로 돌아가기</Link>
        </Button>
      </div>
    </Layout>
  );
};

export default NotFound;
