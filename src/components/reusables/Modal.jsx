import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

const Modal = ({ isOpen, onClose, article, relatedArticles }) => {
  if (!isOpen) return null; // If the modal is not open, don't render anything

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm">
      <div className="relative bg-white p-8 rounded-xl shadow-2xl w-11/12 md:w-2/3 lg:w-1/2 max-h-[90vh] overflow-y-auto transition-all duration-300 ease-in-out">
        {/* Close Button */}
        <button
          className="absolute top-2 right-2 bg-gray-200 text-gray-600 p-1 rounded-full hover:bg-gray-300 transition-colors"
          onClick={onClose}
          aria-label="Close Modal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Article Title */}
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">
          {article.title || <Skeleton className="h-6 w-3/4" />}
        </h2>

        {/* Article Image */}
        <div className="rounded-lg overflow-hidden mb-6">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-64 object-cover"
          />
        </div>

        {/* Article Description */}
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          {article.description || <Skeleton className="h-4 w-full mb-2" />}
        </p>

        {/* Publisher Information */}
        <div className="flex items-center justify-between text-gray-500 text-sm mb-6">
          <span>
            Published by: <strong>{article.publisher || "Unknown"}</strong>
          </span>
          <a
            href={article.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            {article.link ? (
              "Read full article"
            ) : (
              <Skeleton className="h-4 w-1/4" />
            )}
          </a>
        </div>

        {/* Separator */}
        <Separator className="my-4" />

        {/* Related Articles Section */}
        {relatedArticles?.length > 0 ? (
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Related Articles
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedArticles.map((related) => (
                <Card key={related.authorTopicId} className="flex flex-col">
                  <CardHeader>
                    <img
                      src={related.image}
                      alt={related.title}
                      className="rounded-lg h-20 w-full object-cover"
                    />
                  </CardHeader>
                  <CardContent className="flex-1">
                    <h4 className="text-gray-800 text-sm font-semibold mb-1">
                      {related.title.length > 50
                        ? `${related.title.substring(0, 50)}...`
                        : related.title}
                    </h4>
                  </CardContent>
                  <CardFooter>
                    <a
                      href={related.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      Read more
                    </a>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <p>No related articles available.</p>
        )}
      </div>
    </div>
  );
};

export default Modal;
