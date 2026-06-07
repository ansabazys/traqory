import { init, track } from '@traqory/sdk';

init({
  apiKey: 'trk_IVX4NisxS5ZnXU12mW_Kz3YahrZzq9zm',
});

document.body.innerHTML = `
  <h1>Traqory SDK Test</h1>

  <button id="signup">
    Signup Event
  </button>
`;

document.getElementById('signup')?.addEventListener('click', () => {
  track('signup');

  console.log('signup tracked');
});


track("purchase", {
  amount: 99,
  currency: "USD",
  plan: "pro",
});