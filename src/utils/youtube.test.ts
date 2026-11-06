import { test } from "node:test";
import assert from "node:assert/strict";
import { youtubeVideoId } from "./youtube";
test("影片網址解析支援YouTube常用格式並拒絕非官方網域及注入",()=>{
  for(const url of ["https://youtu.be/M7lc1UVf-VE?si=test","https://www.youtube.com/watch?v=M7lc1UVf-VE&t=3","https://m.youtube.com/shorts/M7lc1UVf-VE","https://www.youtube.com/embed/M7lc1UVf-VE","https://www.youtube.com/live/M7lc1UVf-VE"])
    assert.equal(youtubeVideoId(url),"M7lc1UVf-VE");
  for(const url of ["javascript:alert(1)","https://youtube.com.evil.test/watch?v=M7lc1UVf-VE","https://www.youtube.com@evil.test/watch?v=M7lc1UVf-VE","https://user:pass@youtube.com/watch?v=M7lc1UVf-VE","http://youtube.com/watch?v=M7lc1UVf-VE","https://www.youtube.com/playlist?list=abc","https://youtu.be/abc",""])
    assert.equal(youtubeVideoId(url),undefined);
});
