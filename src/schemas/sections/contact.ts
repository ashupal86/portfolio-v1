/**
 * Contact Section Schema
 * Controls the "Get In Touch" section heading/subheading.
 * Social links (email, GitHub, LinkedIn) live in Site Config.
 */
import { fields, singleton } from '@keystatic/core';

export const contactSchema = singleton({
  label: '📬 Contact Section',
  path: 'content/contact',
  schema: {
    heading: fields.text({
      label: 'Section Heading',
      defaultValue: "Let's build something amazing",
    }),
    subheading: fields.text({
      label: 'Sub-heading',
      defaultValue: 'Have a project in mind? Looking for a developer to join your team? Or just want to say hi? My inbox is always open.',
      multiline: true,
    }),
    formEnabled: fields.checkbox({
      label: 'Enable Contact Form',
      defaultValue: true,
    }),
    ctaLabel: fields.text({
      label: 'Submit Button Label',
      defaultValue: 'SEND MESSAGE',
    }),
  },
});
