import { ProbaMickoLazaPage } from './app.po';

describe('proba-micko-laza App', () => {
  let page: ProbaMickoLazaPage;

  beforeEach(() => {
    page = new ProbaMickoLazaPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
