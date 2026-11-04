/** Labelled form control with inline error message. `as` = "input" | "select" | "textarea". */
export default function Field({ id, label, as: Control = 'input', error, children, required, ...props }) {
  const errorId = `${id}-error`;
  return (
    <div className="field" data-invalid={error ? 'true' : undefined}>
      <label htmlFor={id}>
        {label}
        {required && ' *'}
      </label>
      <Control
        id={id}
        name={id}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? errorId : undefined}
        aria-required={required || undefined}
        {...props}
      >
        {children}
      </Control>
      {error && <span id={errorId} className="field__error">{error}</span>}
    </div>
  );
}
