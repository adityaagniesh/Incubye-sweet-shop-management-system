package com.example.sweetshop.repository;

import com.example.sweetshop.model.Sweet;
import com.example.sweetshop.model.SweetCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SweetRepository extends JpaRepository<Sweet, Long> {

    Sweet findBySweetName(String sweetName);
    Sweet findBySweetId(Long sweetId);

    @Query("""
    SELECT s FROM Sweet s
    WHERE (:name IS NULL OR LOWER(s.sweetName) LIKE LOWER(CONCAT('%', :name, '%')))
      AND (:category IS NULL OR s.sweetcategory = :category)
      AND (:minPrice IS NULL OR s.price >= :minPrice)
      AND (:maxPrice IS NULL OR s.price <= :maxPrice)
""")

    List<Sweet> searchSweets(
          @Param("name") String sweetName,
          @Param("category") SweetCategory sweetCategory,
          @Param("minPrice") Double minPrice,
          @Param("maxPrice") Double maxPrice
    );


}
