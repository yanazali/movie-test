import { shallowMount } from "@vue/test-utils";
import Login from "@/views/Login.vue";

describe("Login Page", () => {
  it("should render correctly", () => {
    const wrapper = shallowMount(Login);
    expect(wrapper.element).toMatchSnapshot();
  });
});

import Register from "@/views/Register.vue";

describe("Register Page", () => {
  it("should render correctly", () => {
    const wrapper = shallowMount(Register);
    expect(wrapper.element).toMatchSnapshot();
  });
});

// import BlogPostsList from "@/views/Crud/BlogPostsList.vue";

// describe('Blog Posts List Page', () => {
//   it('should render correctly', () => {
//     const wrapper = shallowMount(BlogPostsList);
//     expect(wrapper.element).toMatchSnapshot();
//   });
// });
