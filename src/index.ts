import YTDlpWrap from 'yt-dlp-wrap';

const DL_PATH = './yt-dlp';

async function main() {
  await Promise.all([getYtDlp(), getChatData('TblrlmrYUkc')]);
}

// yt-dlpのダウンロード
async function getYtDlp() {
  console.log('[getYtDlp]');
  console.log('----- START -----');

  let githubReleasesData = await YTDlpWrap.getGithubReleases(1, 5);

  await YTDlpWrap.downloadFromGithub();

  const ytDlpWrap = new YTDlpWrap(DL_PATH);
  ytDlpWrap.setBinaryPath(DL_PATH);

  console.log('----- END -----');
}

// チャットのダウンロード
async function getChatData(videoId: string) {
  console.log('[getChatData]');
  console.log('----- START -----');

  const ytDlpWrap = new YTDlpWrap(DL_PATH);

  // URL、ファイル名の生成
  const targetUrl = 'https://www.youtube.com/watch?v=' + videoId;
  const fileName = videoId + '.mp4';

  let ytDlpEventEmitter = ytDlpWrap
    .exec([
      targetUrl,
      '-f',
      'best',
      '-o',
      fileName,
      '--skip-download',
      '--write-subs',
      '-P ./files',
    ])
    .on('ytDlpEvent', (eventType, eventData) =>
      console.log(eventType, eventData)
    )
    .on('error', (error) => console.error(error))
    .on('close', () => console.log('all done'));

  console.log('----- END -----');
}

main()
  .then(() => {
    console.log('DONE');
  })
  .catch((err) => {
    console.log(err);
  });
