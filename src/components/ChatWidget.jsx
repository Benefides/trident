import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logos/trident.png';
import { SITE } from '../data/site.js';
import { getReply, QUICK_REPLIES, WELCOME } from '../lib/chatbot.js';
import Icon from './Icon.jsx';

let nextId = 1;
const makeMsg = (from, body) => ({ id: nextId++, from, ...body });

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(() => [makeMsg('bot', { text: WELCOME })]);
  const [draft, setDraft] = useState('');
  const [typing, setTyping] = useState(false);
  const logRef = useRef(null);
  const inputRef = useRef(null);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, typing, open]);

  const send = (text) => {
    const t = text.trim();
    if (!t) return;
    setMessages((m) => [...m, makeMsg('user', { text: t })]);
    setDraft('');
    setTyping(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(async () => {
      const reply = await getReply(t);
      setMessages((m) => [...m, makeMsg('bot', reply)]);
      setTyping(false);
    }, 750);
  };

  return (
    <>
      {open && (
        <section className="chat" role="dialog" aria-label="Chat with Trident Exim">
          <div className="chat__head">
            <span className="chat__avatar"><img src={logo} alt="" /></span>
            <div className="chat__title">
              <strong>Chat with us</strong>
              <span className="chat__status"><i aria-hidden="true" />Trident Assistant · Online</span>
            </div>
            <button type="button" className="icon-btn" aria-label="Close chat" onClick={() => setOpen(false)}>
              <Icon name="close" size={20} strokeWidth={2.4} />
            </button>
          </div>

          <div className="chat__log" ref={logRef} role="log" aria-live="polite">
            {messages.map((m) =>
              m.from === 'bot' ? (
                <div key={m.id} className="bubble bubble--bot">
                  <span>{m.text}</span>
                  {m.link && <ChatLink link={m.link} onNavigate={() => setOpen(false)} />}
                </div>
              ) : (
                <div key={m.id} className="bubble bubble--user">{m.text}</div>
              )
            )}
            {typing && (
              <div className="typing" aria-label="Assistant is typing">
                <span /><span /><span />
              </div>
            )}
          </div>

          <div className="chat__chips">
            {QUICK_REPLIES.map((q) => (
              <button key={q} type="button" className="chip" onClick={() => send(q)}>{q}</button>
            ))}
          </div>
          <form
            className="chat__form"
            onSubmit={(e) => {
              e.preventDefault();
              send(draft);
            }}
          >
            <label htmlFor="chat-input" className="sr-only">Type your message</label>
            <input
              id="chat-input"
              ref={inputRef}
              type="text"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Type your message…"
              autoComplete="off"
            />
            <button type="submit" className="chat__send" aria-label="Send message">
              <Icon name="send" size={20} />
            </button>
          </form>
          <p className="chat__note">Automated assistant · For urgent help call {SITE.phoneDisplay}</p>
        </section>
      )}

      <div className="chat-launcher-wrap">
        {!open && <span className="chat-ping" aria-hidden="true" />}
        <button
          type="button"
          className={`fab${open ? ' is-open' : ''}`}
          aria-label={open ? 'Close chat' : 'Chat with us'}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <Icon name={open ? 'close' : 'chat'} size={24} strokeWidth={open ? 2.4 : 2} />
          {!open && <span className="fab__label">Chat with us</span>}
        </button>
      </div>
    </>
  );
}

function ChatLink({ link, onNavigate }) {
  const content = (
    <>
      {link.label}
      <Icon name="arrowRight" size={14} strokeWidth={2.6} />
    </>
  );
  if (link.to) {
    return <Link className="bubble__link" to={link.to} onClick={onNavigate}>{content}</Link>;
  }
  return <a className="bubble__link" href={link.href} target="_blank" rel="noopener noreferrer">{content}</a>;
}
