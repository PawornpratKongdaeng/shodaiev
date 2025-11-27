export default function ContactEditor({ config, setConfig }: { config: any; setConfig: (config: any) => void }) {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      
      <div className="form-control">
        <label className="label">เบอร์โทร</label>
        <input
          className="input input-bordered"
          value={config?.phone || ""}

          onChange={(e) =>
            setConfig({ ...config, phone: e.target.value })
          }
        />
      </div>

      <div className="form-control">
        <label className="label">Line ID</label>
        <input
          className="input input-bordered"
          value={config?.line || ""}
          onChange={(e) =>
            setConfig({ ...config, line: e.target.value })
          }
        />
      </div>

      <div className="form-control md:col-span-2">
        <label className="label">ลิงก์ Line</label>
        <input
          className="input input-bordered"
          value={config?.lineUrl ||  ""}
          onChange={(e) =>
            setConfig({ ...config, lineUrl: e.target.value })
          }
        />
      </div>

      <div className="form-control md:col-span-2">
        <label className="label">Facebool</label>
        <input
          className="input input-bordered"
          value={config?.facebook || ""}
          onChange={(e) =>
            setConfig({ ...config, facebook: e.target.value })
          }
        />
      </div>
    </div>
  );
}
