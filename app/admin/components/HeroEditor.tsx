import type { Dispatch, SetStateAction } from 'react';

type HeroConfig = {
  heroTitle: string;
  heroSubtitle: string;
};

type Props = {
  config: HeroConfig;
  setConfig: Dispatch<SetStateAction<HeroConfig>>;
};

export default function HeroEditor({ config, setConfig }: Props) {
  return (
    <div className="space-y-3">
      <div className="form-control">
        <label className="label">หัวข้อใหญ่ (Hero Title)</label>
        <input
          className="input input-bordered"
          value={config.heroTitle}
          onChange={(e) =>
            setConfig({ ...config, heroTitle: e.target.value })
          }
        />
      </div>

      <div className="form-control">
        <label className="label">ข้อความรอง (Hero Subtitle)</label>
        <textarea
          className="textarea textarea-bordered"
          value={config.heroSubtitle}
          rows={3}
          onChange={(e) =>
            setConfig({ ...config, heroSubtitle: e.target.value })
          }
        />
      </div>
    </div>
  );
}
