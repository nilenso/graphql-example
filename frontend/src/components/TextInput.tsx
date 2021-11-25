interface Props {
  label: string;
  placeholder?: string;
  initialInput?: string;
}

const TextInput = (props: Props) => {
  return (
    <div className="form-control p-5">
      <label className="label">
        <span>{props.label}</span>
      </label>
      <input
        type="text"
        value={props.initialInput}
        placeholder={props.placeholder}
        className="input input-bordered w-full"
      />
    </div>
  );
};

export default TextInput;
