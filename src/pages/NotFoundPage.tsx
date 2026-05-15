import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';

export const NotFoundPage = () => (
  <div className="relative z-10 mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-4 text-center">
    <div className="mb-6 h-24 w-24 rounded-full border border-dashed border-cyan-200/30 bg-cyan-200/5 shadow-glow" />
    <h1 className="text-4xl font-light text-white">这个节点不存在于已知的产业链中</h1>
    <p className="mt-4 text-slate-400">迷失在节点宇宙里时，回到主网络最可靠。</p>
    <Link to="/" className="mt-8">
      <Button variant="primary">返回主网络</Button>
    </Link>
  </div>
);
