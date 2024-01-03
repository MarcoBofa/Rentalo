export default function Buttons() {
  return (
    <div>
      <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
        <input
          className="/* your existing radio button styles */"
          type="radio"
          name="businessType"
          id="concessionaria"
          value="concessionaria"
        />
        <label
          className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"
          htmlFor="concessionaria"
        >
          Concessionaria
        </label>
      </div>
      <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
        <input
          className="/* your existing radio button styles */"
          type="radio"
          name="businessType"
          id="impresa"
          value="impresa"
        />
        <label
          className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"
          htmlFor="impresa"
        >
          Impresa
        </label>
      </div>
      {/* ... rest of your form ... */}
    </div>
  );
}
