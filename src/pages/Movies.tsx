
import React from "react";
import Layout from "@/components/Layout";
// import { Button } from "@/components/ui/button";
// import { Plus } from "lucide-react";
// import { useMediaLog } from "@/contexts/MediaLogContext";
// import MovieCard from "@/components/MovieCard"; // To be created
// import AddMovieForm from "@/components/AddMovieForm"; // To be created

const MoviesPage: React.FC = () => {
  // const { movieEntries } = useMediaLog();
  // const [showAddForm, setShowAddForm] = useState(false);

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-primary">내 영화 기록</h1>
        {/* <Button onClick={() => setShowAddForm(true)}>
          <Plus className="mr-2 h-4 w-4" /> 새 영화 기록
        </Button> */}
      </div>

      {/* {showAddForm && <AddMovieForm onCancel={() => setShowAddForm(false)} />} */}

      <div className="text-center py-10 text-gray-500">
        <p>영화 기록 기능은 현재 개발 중입니다.</p>
        <p className="text-sm mt-1">곧 멋진 기능으로 찾아올게요!</p>
      </div>

      {/* {movieEntries.length === 0 && !showAddForm ? (
        <div className="text-center py-10 text-gray-500">
          <p>아직 기록된 영화가 없습니다.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {movieEntries.map((movie) => (
            // <MovieCard key={movie.id} movie={movie} />
            <div key={movie.id}>{movie.title}</div> // Placeholder
          ))}
        </div>
      )} */}
    </Layout>
  );
};

export default MoviesPage;

