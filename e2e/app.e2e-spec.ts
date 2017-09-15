import { WtwPage } from './app.po';

describe('wtw App', () => {
  let page: WtwPage;

  beforeEach(() => {
    page = new WtwPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
