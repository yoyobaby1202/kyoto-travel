import { useState } from "react";
import { Film, ExternalLink } from "lucide-react";
import { useLocal } from "../utils/store";
import { youtubeVideoId } from "../utils/youtube";
import { recapVideoUrl } from "../data/recap";

export function Recap() {
  const [url, save, ready, error] = useLocal("recap-youtube-url", recapVideoUrl);
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const id = youtubeVideoId(url);
  return <section className="recap-page">
    <div className="page-title"><span className="eyebrow">OUR KYOTO MEMORIES</span><h1>旅程回顧</h1><p>把一起走過的京都，再看一遍。</p></div>
    <div className="paper-card">
      {id ? <>
        <div className="recap-player"><iframe key={id} src={`https://www.youtube-nocookie.com/embed/${id}?fs=1&playsinline=1&rel=0`} title="京都旅行回顧影片" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" /></div>
        <p className="small">點播放器右下角可全螢幕觀看。若影片限制嵌入，請開啟 YouTube 觀看。</p>
        <a className="text-link" href={`https://www.youtube.com/watch?v=${id}`} target="_blank" rel="noreferrer"><ExternalLink size={15}/> 在 YouTube 觀看</a>
      </> : <div className="recap-empty"><Film size={44}/><h2>我們的京都電影，敬請期待。</h2><p>完成影片後，貼上 YouTube 網址，就能在這裡播放。</p></div>}
      {!editing && <button className="secondary" disabled={!ready} onClick={()=>setEditing(true)}>{id ? "更換影片" : "設定 YouTube 影片"}</button>}
      {editing && <form className="recap-form" onSubmit={async e=>{
        e.preventDefault();
        const value=String(new FormData(e.currentTarget).get("url") || "").trim();
        if(value && !youtubeVideoId(value)){setMessage("請貼上有效的 YouTube 影片網址（watch、youtu.be 或 Shorts）。");return;}
        setBusy(true);
        try {await save(value);setEditing(false);setMessage(value ? "影片已設定。" : "影片已移除。");} catch {setMessage("儲存失敗，請重試。");} finally{setBusy(false);}
      }}>
        <label htmlFor="recap-url">YouTube 影片網址</label>
        <input id="recap-url" name="url" type="url" defaultValue={url} placeholder="https://www.youtube.com/watch?v=…" maxLength={2048} autoComplete="off" />
        <div className="button-row"><button className="primary" disabled={busy}>儲存影片</button><button className="secondary" type="button" onClick={()=>setEditing(false)}>取消</button></div>
        <p className="small">留空儲存可移除影片。這裡設定的網址保留在目前裝置；之後可將影片設為網站的共同版本。</p>
      </form>}
      {message && <p role="status">{message}</p>}{error && <p role="alert">{error}</p>}
    </div>
  </section>;
}
