import { X } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

interface GetCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GetCodeModal({ isOpen, onClose }: GetCodeModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setName('');
      setEmail('');
      setNameError('');
      setEmailError('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    let hasError = false;

    if (!name.trim()) {
      setNameError('请填写此项');
      hasError = true;
    } else {
      setNameError('');
    }

    if (!email.trim()) {
      setEmailError('请填写此项');
      hasError = true;
    } else if (!validateEmail(email)) {
      setEmailError('请输入有效的邮箱地址');
      hasError = true;
    } else {
      setEmailError('');
    }

    if (!hasError) {
      onClose();
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('✅ 我们会将代码包发送至您的邮箱（演示模式）');
      } else if ('Notification' in window && Notification.permission !== 'denied') {
        Notification.requestPermission().then((permission) => {
          if (permission === 'granted') {
            new Notification('✅ 我们会将代码包发送至您的邮箱（演示模式）');
          } else {
            alert('✅ 我们会将代码包发送至您的邮箱（演示模式）');
          }
        });
      } else {
        alert('✅ 我们会将代码包发送至您的邮箱（演示模式）');
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm animate-fadeIn">
      <div
        ref={modalRef}
        className="w-full max-w-md bg-white rounded-3xl shadow-soft-xl overflow-hidden animate-fadeIn"
      >
        <div className="relative p-6 pb-0">
          <button
            onClick={onClose}
            className="absolute top-0 right-0 p-2 text-soft-muted hover:text-soft-text hover:bg-primary-50 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
          
          <div className="text-center mb-6">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary-100 to-accent-pink/30 flex items-center justify-center">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 7L12 3L4 7M20 7L12 11M20 7V17L12 21M12 11L4 7M12 11V21M4 7V17L12 21" stroke="#8C7CF0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-soft-text mb-2">获取项目代码</h3>
            <p className="text-soft-muted text-sm">填写您的信息，我们将发送代码包至您的邮箱</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="px-6 pb-6">
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-soft-text mb-2">
              姓名
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (nameError) setNameError('');
              }}
              placeholder="请输入您的姓名"
              className={`w-full px-4 py-3 bg-soft-bg rounded-xl border transition-all outline-none ${
                nameError 
                  ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100' 
                  : 'border-primary-100 focus:border-primary-400 focus:ring-2 focus:ring-primary-100'
              }`}
            />
            {nameError && (
              <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                {nameError}
              </p>
            )}
          </div>

          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-soft-text mb-2">
              邮箱
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (emailError) setEmailError('');
              }}
              placeholder="请输入您的邮箱地址"
              className={`w-full px-4 py-3 bg-soft-bg rounded-xl border transition-all outline-none ${
                emailError 
                  ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100' 
                  : 'border-primary-100 focus:border-primary-400 focus:ring-2 focus:ring-primary-100'
              }`}
            />
            {emailError && (
              <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                {emailError}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-soft-gradient text-white font-semibold rounded-xl shadow-soft hover:shadow-soft-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            提交获取
          </button>
        </form>
      </div>
    </div>
  );
}
