import { useParams } from 'react-router-dom';
import Layout from '../components/layout';

const Explore = () => {
  const { category } = useParams<{ category: string }>();

  return (
    <Layout>
      <div className="mx-auto max-w-7xl px-6 py-8">
        <h1 className="text-4xl font-serif font-bold capitalize text-zinc-900 dark:text-zinc-50">
          Explore: {category}
        </h1>
      </div>
    </Layout>
  );
};

export default Explore;
