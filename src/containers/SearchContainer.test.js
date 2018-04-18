import React from 'react';
import SearchContainer from './SearchContainer';
import { shallow, mount } from 'enzyme';

describe('<SearchContainer />', () => {
  const mockStore = {
    // we mock the selectors instead of knowing state structure
    getState: () => ({}),
    dispatch: () => {},
    subscribe: () => {}
  };

  const mockSelectors = {
    getSearchResults: jest.fn().mockReturnValue([]),
    getStagedQuery: jest.fn().mockReturnValue({}),
    getVisibleQueryText: jest.fn().mockReturnValue(''),
    getSearchExecutionTime: jest.fn(),
    getSearchTotal: jest.fn(),
    getSearchTotalPages: jest.fn(),
    getPage: jest.fn(),
    getSearchError: jest.fn(),
    isSearchPending: jest.fn(),
    isSearchComplete: jest.fn(),
    searchFacets: jest.fn(),
    stagedConstraints: jest.fn().mockReturnValue({})
  };

  it('works', () => {
    shallow(
      <SearchContainer
        actions={{}}
        store={mockStore}
        selectors={mockSelectors}
      />
    );
  });

  it('runs a search', () => {
    const searchSpy = jest.fn();
    searchSpy.mockReturnValue(Promise.resolve([]));
    const noop = () => {};
    const mockActions = {
      runSearch: searchSpy,
      addConstraint: noop,
      setQueryText: noop,
      removeConstraint: noop
    };
    const wrapper = mount(
      <SearchContainer
        actions={mockActions}
        store={mockStore}
        selectors={mockSelectors}
      />
    );
    wrapper.find('button.ml-execute-search').simulate('submit');
    expect(searchSpy.mock.calls.length).toBe(1);
  });
});
