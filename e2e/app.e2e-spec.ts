import { SubjectBehaviorEjPage } from './app.po';

describe('subject-behavior-ej App', () => {
  let page: SubjectBehaviorEjPage;

  beforeEach(() => {
    page = new SubjectBehaviorEjPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
