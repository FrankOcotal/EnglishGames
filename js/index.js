//ca-app-pub-6843845448180201/7616490626
//ca-app-pub-6843845448180201/7668461512

document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
  // Iniciar AdMob Plus
  admob.start()
    .then(() => {
      console.log('AdMob Plus initialized!');
      cargarBanner();
      cargarInterstitial();
    })
    .catch(error => {
      console.error('Error initializing AdMob Plus:', error); 
    });

  // Cargar banner
  function cargarBanner() {
    const banner = new admob.BannerAd({
      adUnitId: 'ca-app-pub-6843845448180201/7616490626',
    });

    banner.load()
      .then(() => {
        console.log('Banner loaded');
        return banner.show(); 
      })
      .catch(error => {
        console.error('Error loading/showing banner:', error);
      });

    // Manejar eventos del banner (opcional)
    banner.on('load', () => console.log('Banner loaded'));
    banner.on('loadfail', (e) => console.error('Banner load failed', e));
    banner.on('show', () => console.log('Banner shown'));
    banner.on('showfail', (e) => console.error('Banner show failed', e));
  }

  // Cargar intersticial
  function cargarInterstitial() {
    const interstitial = new admob.InterstitialAd({
      adUnitId: 'ca-app-pub-6843845448180201/7668461512',
    });

    interstitial.load()
      .then(() => console.log('Interstitial loaded'))
      .catch(error => {
        console.error('Error loading interstitial:', error);
      });

    // Muestra el intersticial en el momento adecuado (por ejemplo, después de completar un nivel)
    // Ejemplo:
    // document.addEventListener('nivelCompletado', () => {
    //   interstitial.show();
    // });

    // Manejar eventos del intersticial (opcional)
    interstitial.on('load', () => console.log('Interstitial loaded'));
    interstitial.on('loadfail', (e) => console.error('Interstitial load failed', e));
    interstitial.on('show', () => console.log('Interstitial shown'));
    interstitial.on('showfail', (e) => console.error('Interstitial show failed', e));
  }
}
