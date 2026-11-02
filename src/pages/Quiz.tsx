import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CAT_BY_ID } from '../data/cats';
import { QUESTIONS } from '../data/questions';
import { useLocale } from '../i18n';
import CatImage from '../components/CatImage';
import { resultPath } from '../lib/link';
import { QUESTION_COUNT, isValidAnswers } from '../lib/scoring';
import { loadProgress, saveLast, saveProgress } from '../lib/storage';

const TRANSITION_MS = 1400;
const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function Quiz() {
  const { t, l } = useLocale();
  const navigate = useNavigate();
  const [{ answers, step }, setState] = useState(loadProgress);
  const [finishing, setFinishing] = useState(false);
  const heading = useRef<HTMLLegendElement>(null);
  const first = useRef(true);

  const question = QUESTIONS[step];
  const selected = answers[step];
  const isLast = step === QUESTION_COUNT - 1;

  useEffect(() => {
    saveProgress(answers, step);
  }, [answers, step]);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    heading.current?.focus();
    window.scrollTo(0, 0);
  }, [step]);

  const goToResult = () => {
    if (!isValidAnswers(answers)) return;
    saveLast(answers);
    navigate(resultPath(answers), { replace: true });
  };

  useEffect(() => {
    if (!finishing) return;
    const timer = window.setTimeout(goToResult, TRANSITION_MS);
    return () => window.clearTimeout(timer);
  });

  const pick = (index: number) =>
    setState((s) => ({ ...s, answers: s.answers.map((a, i) => (i === step ? index : a)) }));
  const move = (delta: number) => setState((s) => ({ ...s, step: s.step + delta }));

  const next = () => {
    if (selected === null) return;
    if (!isLast) return move(1);
    if (reducedMotion()) return goToResult();
    setFinishing(true);
  };

  if (finishing) {
    return (
      <section className="transition" aria-live="polite">
        <CatImage cat={CAT_BY_ID.abyssinian} size="small" eager decorative className="transition-cat" />
        <p>{t('transition')}</p>
        <button type="button" className="text-button" onClick={goToResult}>{t('skipTransition')}</button>
      </section>
    );
  }

  return (
    <section className="quiz">
      <div className="progress">
        <span>{t('questionOf', { n: step + 1, total: QUESTION_COUNT })}</span>
        <div
          className="progress-track" role="progressbar"
          aria-valuemin={1} aria-valuemax={QUESTION_COUNT} aria-valuenow={step + 1}
          aria-label={t('questionOf', { n: step + 1, total: QUESTION_COUNT })}
        >
          <span style={{ width: `${((step + 1) / QUESTION_COUNT) * 100}%` }} />
        </div>
      </div>
      <fieldset key={question.id}>
        <legend ref={heading} tabIndex={-1}>{l(question.prompt)}</legend>
        <div className="options">
          {question.options.map((option, index) => (
            <label key={option.id} className={`option${selected === index ? ' selected' : ''}`}>
              <input
                type="radio" name={question.id} checked={selected === index}
                onChange={() => pick(index)}
              />
              <span className="option-mark" aria-hidden="true">{option.id}</span>
              <span className="option-text">{l(option.text)}</span>
              <svg className="option-tick" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4 13c2 2 4 4 6 6 3-6 6-10 10-14" />
              </svg>
            </label>
          ))}
        </div>
      </fieldset>
      <div className="quiz-nav">
        <button type="button" className="button" onClick={() => move(-1)} disabled={step === 0}>{t('prev')}</button>
        <button type="button" className="button primary" onClick={next} disabled={selected === null}>
          {isLast ? t('seeResult') : t('next')}
        </button>
      </div>
      <p className="quiz-hint" aria-live="polite">{selected === null ? t('answerFirst') : ' '}</p>
    </section>
  );
}
