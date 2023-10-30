function FormJobSubmit() {
  function submitJob(event) {
    event.preventDefault();
  }

  return (
    <form>
      <div className="mb-3">
        <label htmlFor="job-field" className="form-label">
          Add URLs to check, with one line per entry.
        </label>
        <textarea
          id="job-field"
          name="job-field"
          className="form-control"
          rows="1"
          cols="50"
          required
          defaultValue=""
        />
      </div>
      <button type="submit" id="submit-button" className="btn btn-primary btn-sm mb-1">
        Submit
      </button>
    </form>
  );
}

export default FormJobSubmit;

