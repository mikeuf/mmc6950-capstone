function FormUrlSubmit() {
  function submitList(event) {
    event.preventDefault();
  }

  return (
    <form>
      <div className="mb-3">
        <label htmlFor="resource-list" className="form-label">
          Add URLs to check, with one line per entry.
        </label>
        <textarea
          id="resource-list"
          name="resource-list"
          className="form-control"
          rows="10"
          cols="50"
          required
          defaultValue="example.com\ninstagram.com\nfacebook.com\ngoogle.com\nmicrosoft.com"
        />
      </div>
      <button type="submit" id="submit-button" className="btn btn-primary btn-sm mb-1">
        Submit
      </button>
    </form>
  );
}

export default FormUrlSubmit;

