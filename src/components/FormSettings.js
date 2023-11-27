'use client';

import { useState } from 'react';
export default function FormSettings({onSettingsClick}) {
return (
<>
<h2 className="display-4">Settings</h2>
<p className="lead">Update the values as needed and click the Save button.</p>
<form>
    <div className="text-center d-flex justify-content-start">
        <button type="button" id="save-button" className="btn btn-light me-3" onClick={onSettingsClick}>
            Save
        </button>
        <button type="button" id="cancel-button" className="btn btn-outline-light border-3 ms-3" onClick={onSettingsClick}>
            Cancel
        </button>
    </div>
    <div>
        <p>Time to wait between testing each destination(in seconds):</p>
        <p>Save test results permanently:</p>
        <p>Clear previous test results:</p>
    </div>
</form>
</>
);
}

