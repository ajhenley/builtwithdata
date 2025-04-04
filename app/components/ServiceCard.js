/**
 * ServiceCard.js
 * 
 * Vue component for displaying service cards throughout the site.
 * This component displays a service with an icon, title, and description.
 */

Vue.component('service-card', {
  props: {
    // FontAwesome icon class
    icon: {
      type: String,
      required: true
    },
    // Service title
    title: {
      type: String,
      required: true
    },
    // Service description
    description: {
      type: String,
      required: true
    }
  },
  template: `
    <div class="service-card">
      <div class="service-icon">
        <i :class="icon"></i>
      </div>
      <h3>{{ title }}</h3>
      <p>{{ description }}</p>
    </div>
  `
}); 