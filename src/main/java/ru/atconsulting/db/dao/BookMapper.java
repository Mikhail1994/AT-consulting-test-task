package ru.atconsulting.db.dao;


import org.springframework.jdbc.core.RowMapper;
import ru.atconsulting.db.model.Book;

import java.sql.ResultSet;
import java.sql.SQLException;


public class BookMapper implements RowMapper {
    @Override
    public Object mapRow(ResultSet resultSet, int i) throws SQLException {
        Book book = new Book();
        book.setIsn(resultSet.getString("isn"));
        book.setAuthor(resultSet.getString("author"));
        book.setOwner(resultSet.getString("owner"));
        book.setTitle(resultSet.getString("title"));
        return book;
    }
}
