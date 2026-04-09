import { SERVER_BASE_URL } from "../api/apiClient";

export const formatCurrency = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(Number(value || 0));

export const buildImageUrl = (imagePath) => {
  if (!imagePath) {
    return "";
  }

  if (imagePath.startsWith("http") || imagePath.startsWith("data:")) {
    return imagePath;
  }

  return `${SERVER_BASE_URL}${imagePath}`;
};

export const formatRating = (rating) => `${Number(rating).toFixed(1)} / 5`;

export const combineClasses = (...classNames) =>
  classNames.filter(Boolean).join(" ");
