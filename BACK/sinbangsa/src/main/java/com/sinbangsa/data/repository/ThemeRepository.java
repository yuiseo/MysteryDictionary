package com.sinbangsa.data.repository;


import com.sinbangsa.data.entity.Store;
import com.sinbangsa.data.entity.Theme;
import com.sinbangsa.data.entity.ThemeTime;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ThemeRepository extends JpaRepository<Theme, Long> {


    Optional<Theme> findById(long id);
    Optional<Theme> getById(long themeId);
    List<Theme> findAllByStore(Store store);
    List<Theme> findAllByThemeNameContaining(String searchWord, PageRequest pageRequest);
    int countThemeByThemeNameContaining(String searchWord);
    int countByStore(Store store);

    @Query(value = "select ifnull(max(t.id),0) from theme t where t.id > :storeId * 100",nativeQuery = true)
    Long getNewId(@Param("storeId") long storeId);

}
