function FormUserSubmit() {
  function submitUser(event) {
    event.preventDefault();
  }

  return (
    <form>
      <div className="mb-3">
        <label htmlFor="username-field" className="form-label">
          Add name of user.
        </label>
        <textarea
          id="username-field"
          name="username-field"
          className="form-control"
          rows="1"
          cols="50"
          required
          defaultValue="Jane Doe"
        />
      </div>
      <button type="submit" id="submit-button" className="btn btn-primary btn-sm mb-1">
        Submit
      </button>
    </form>
  );
}

export default FormUserSubmit;

