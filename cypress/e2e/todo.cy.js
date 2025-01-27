describe("To-Do App", () => {
  it("should add a new task", () => {
    cy.visit("http://localhost:3000/todo"); // Replace with your app's URL

    // Type a new task into the input field
    cy.get('input[placeholder="Add a new task..."]').type("Learn Cypress");

    // Click the Add button
    cy.contains("Add").click();

    // Verify the task was added
    cy.contains("Learn Cypress").should("be.visible");
  });

  it("should mark a task as completed", () => {
    cy.visit("http://localhost:3000/todo");

    // Add a task
    cy.get('input[placeholder="Add a new task..."]').type("Complete Task");
    cy.contains("Add").click();

    // Click the task to mark it as completed
    cy.contains("Complete Task").click();

    // Verify the task is marked as completed
    cy.contains("Complete Task").should(
      "have.css",
      "text-decoration-line",
      "line-through"
    );
  });
});
