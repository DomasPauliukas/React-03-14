import { useState } from "react";
import { User } from "../../Types/ExportTypes";

interface ReviewFormProps {
  users: User[];
  onSubmit: (reviewData: { rating: number; comment: string; userId: string }) => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ users, onSubmit }) => {
  const [newReview, setNewReview] = useState({
    rating: 0,
    comment: "",
    userId: "", 
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setNewReview((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    onSubmit(newReview)
  };

  return (

    <form onSubmit={handleFormSubmit}>
      <div className="formControl">
        <label>Rating (1-5):</label>
        <input type="number" name="rating" value={newReview.rating} onChange={handleInputChange} min={1} max={5} required/>
      </div>

      <div className="formControl">
        <label>Comment:</label>
        <textarea name="comment" value={newReview.comment} onChange={handleInputChange} required/>
      </div>

      <div className="formControl">
        <label>Select User:</label>
        <select name="userId" value={newReview.userId} onChange={handleInputChange} required>
          <option value="">Select a user</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.firstName} {user.lastName}
            </option>
          ))}
        </select>
      </div>

      <button type="submit">Submit Review</button>
    </form>
  );
};

export default ReviewForm;