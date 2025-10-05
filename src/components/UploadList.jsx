import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listUploads } from '../features/uploadsSlice';

export default function UploadList() {
  const dispatch = useDispatch();
  const uploads = useSelector(s => s.uploads.list || []);

  useEffect(() => { dispatch(listUploads()); }, [dispatch]);

  return (
    <div>
      <h2 className="text-lg font-semibold mb-3">My uploads</h2>
      {uploads.length === 0 ? (
        <p className="text-sm text-slate-600">No uploads yet.</p>
      ) : (
        <ul className="space-y-2">
          {uploads.map(u => (
            <li key={u.id} className="p-2 border rounded flex justify-between items-center">
              <div>
                <div className="font-medium">{u.file_name}</div>
                <div className="text-xs text-slate-500">{new Date(u.created_at).toLocaleString()}</div>
              </div>
              <a href={u.s3_url} target="_blank" rel="noreferrer" className="text-sm text-sky-600">Open</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
